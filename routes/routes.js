import e from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  getAllPosts,
  deleteSingle,
  getSinglePost,
  createPost,
  udpatePost,
  getRatings,
  addRating,
} from "../handlers/handler.js";

//Styrer hvad der sker, når vi går på /etellerandet.

const router = e.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadsDir");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//Ikke test.
router.get("/posts", async function (req, res) {
  try {
    const result = await getAllPosts();

    return res.status(200).send({
      status: "ok",
      message: "posts blev fundet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

router.get("/post/:id", async function (req, res) {
  try {
    const result = await getSinglePost(req.params.id);

    return res.status(200).send({
      status: "ok",
      message: "single post blev fundet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

//Ikke test.
router.post("/posts", upload.array("image"), async function (req, res) {
  try {
    let { title, text, category } = req.body;

    if (!title) {
      throw new Error("Ingen titel");
    }

    if (!text) {
      throw new Error("Ingen text field!");
    }

    if (!category) {
      throw new Error("Ingen category!");
    }

    if (!req.files) {
      throw new Error("Ingen billeder uploaded! Skal uploades!");
    }

    const uploadedImgs = [];
    for (let i = 0; i < req.files.length; i++) {
      uploadedImgs.push(
        `${process.env.SERVER_HOST}/uploads/${req.files[i].filename}`
      );
    }

    const comments = [];
    const likes = 0;
    const date = Date.now();
    category = JSON.parse(category); //Gør det til en ordentlig array, og ikke bare en string.

    const postObj = {
      title,
      date,
      text,
      likes,
      comments,
      category,
      imgs: uploadedImgs,
    };

    const result = await createPost(postObj);

    return res.status(201).send({
      status: "ok",
      message: "Post lavet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

//Ikke test.
router.delete("/post/:id", async (req, res) => {
  try {
    const result = await deleteSingle(req.params.id);

    return res.status(200).send({
      status: "ok",
      message: "Post blev fjernet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

//Ikke test.
//tilføj comment
router.post("/addComment/:id", async function (req, res) {
  try {
    const { email, name, text } = req.body;

    if (!email || !name || !text) {
      throw new Error("Udfyld alt information!");
    }
    const commentObjToAdd = { email, name, text };

    let data = await getSinglePost(req.params.id);

    data.comments.push(commentObjToAdd);

    const result = await udpatePost(data);

    return res.status(200).send({
      status: "ok",
      message: "Indlæg kommentar blev tilføjet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

//Ikke test.
router.delete("/deleteComment/:postid/:commentid", async function (req, res) {
  try {
    let data = await getSinglePost(req.params.id);

    const index = data.comments.findIndex(
      (element) => element._id == req.params.commentid
    );

    data.comments.splice(index, 1);

    const result = await udpatePost(data);

    return res.status(200).send({
      status: "ok",
      message: "Kommentar blev fjernet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

//change method //Ikke test.
router.patch("/incrementLike/:id", async (req, res) => {
  try {
    let data = await getSinglePost(req.params.id);

    data.likes = data.likes + 1;

    const result = await udpatePost(data);

    return res.status(200).send({
      status: "ok",
      message: "Like blev tilføjet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

//Ikke testet.
router.patch("/decrementLike/:id", async (req, res) => {
  try {
    let data = await getSinglePost(req.params.id);

    data.likes = data.likes - 1;

    const result = await udpatePost(data);

    return res.status(200).send({
      status: "ok",
      message: "Like blev fjernet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

router.get("/getNumberOfPosts", async (req, res) => {
  try {
    const result = await getAllPosts();
    const number = result.length;

    return res.status(200).send({
      status: "ok",
      message: "Posts og information blev fundet.",
      data: number,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

router.put("/updatePost/:id", upload.array("image"), async (req, res) => {
  try {
    let { title, text, category } = req.body;
    if (!title || !text || !category || !req.files) {
      throw new Error("Alt information skal være med!");
    }
    const uploadedImgs = [];
    for (let i = 0; i < req.files.length; i++) {
      uploadedImgs.push(
        `${process.env.SERVER_HOST}/uploads/${req.files[i].filename}`
      );
    }

    const oldPost = await getSinglePost(req.params.id);

    const comments = oldPost.comments;
    const likes = oldPost.likes;
    const date = oldPost.date;
    category = JSON.parse(category); //Gør det til en ordentlig array, og ikke bare en string.

    const postObj = {
      id: oldPost._id,
      title,
      date,
      text,
      likes,
      comments,
      category,
      imgs: uploadedImgs,
    };

    const result = await udpatePost(postObj);

    return res.status(201).send({
      status: "ok",
      message: "Post lavet.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});
router.get("/getRating", async (req, res) => {
  try {
    const result = await getRatings();

    //get average.
    console.log(result, typeof result);

    let sum = 0;
    for (let i = 0; i < result.length; i++) {
      sum = sum + result[i].rating;
    }

    const average = sum / result.length;

    return res.status(200).send({
      status: "ok",
      message: "Posts og information blev fundet.",
      data: average,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

router.post("/sendRating", async function (req, res) {
  try {
    if (req.body.rating > 5 || req.body.rating < 1) {
      throw new Error("Skal være mellem 1 og 5.");
    }

    const result = await addRating(req.body);

    return res.status(200).send({
      status: "ok",
      message: "Rating blev sendt.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "not ok",
      message: error.message,
      data: null,
    });
  }
});

export default router;

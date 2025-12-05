import { model } from "mongoose";
import postModel from "../models/post.model.js";
import ratingModel from "../models/rating.model.js";
import userModel from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//Return enten result eller throw new Error med en decideret error eller error.message.

export async function getAllPosts() {
  try {
    const result = await postModel.find({});
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSinglePost(id) {
  try {
    const result = await postModel.findById(id);

    if (!result) {
      throw new Error("Ingen posts med dette id...");
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteSingle(id) {
  try {
    const result = await postModel.findById(id);

    if (!result) {
      throw new Error("Ingen posts med dette id...");
    }

    const deleted = await postModel.findByIdAndDelete(id);

    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteSingleUser(id) {
  try {
    const result = await userModel.findById(id);

    if (!result) {
      throw new Error("Ingen user med dette id...");
    }

    const deleted = await userModel.findByIdAndDelete(id);

    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createPost(bodyObj) {
  try {
    const result = await postModel.create(bodyObj);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function udpatePost(bodyObj) {
  try {
    const result = await postModel.findById(bodyObj.id);

    if (!result) {
      throw new Error("Ingen matchede id...");
    }

    const { id, ...updateData } = bodyObj; //Tager id parameter, og putter i id var, og tager alle andre og putter i updatedata objektet.

    const updatedPost = await postModel.findByIdAndUpdate(id, updateData);

    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addRating(bodyObj) {
  try {
    const result = await ratingModel.create(bodyObj);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getRatings() {
  try {
    const result = await ratingModel.find({});
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUsers() {
  try {
    const result = await userModel.find({}).select("-password");
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function login(obj) {
  try {
    const result = await userModel.findOne({ email: obj.email });

    if (!result) {
      throw new Error("Ingen bruger fundet!");
    }

    console.log(result);
    console.log(obj);

    const validpass = await bcryptjs.compare(obj.password, result.password);

    if (!validpass) {
      throw new Error("Ingen bruger fundet!");
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpires = "1h";

    const token = jwt.sign(
      {
        _id: result._id,
        email: result.email,
        name: result.name,
        role: result.role,
      },
      jwtSecret,
      { expiresIn: jwtExpires }
    );

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(id) {
  try {
    const result = await userModel.findById(id);

    if (!result) {
      throw new Error("Ingen bruger med dette id...");
    }

    const deleted = await userModel.findByIdAndDelete(id);

    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addUser(bodyobj) {
  try {
    const result = await userModel.create(bodyobj);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

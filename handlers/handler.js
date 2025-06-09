import { model } from "mongoose";
import postModel from "../models/post.model.js";
import ratingModel from "../models/rating.model.js";

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

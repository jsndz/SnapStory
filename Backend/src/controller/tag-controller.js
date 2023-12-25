import TagService from "../services/tag-service.js";

const tagService = new TagService();

export const CreateTag = async (req, res) => {  
  try {
    const response = await tagService.createTags(req.body);
    return res.status(201).json({
      data: response,
      message: "Successfully Taged",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be Taged",
      sucess: false,
      err: { error },
    });
  }
}

export const getAllTags = async (req, res) => {
  try {
    const response = await tagService.getTags();
    return res.status(201).json({
      data: response,
      message: "Successfully fetched a Tags from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt get Tags",
      sucess: true,
      err: { error },
    });
  }
}

export const getTagById = async (req, res) => {
  try {
    const response = await tagService.get(req.params.id);
    return res.status(201).json({
      data: response,
      message: "Successfully fetched a Tag from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be Taged",
      sucess: true,
      err: { error },
    });
  }
}

export const updateTag = async (req, res) => {
  try {
    const response = await tagService.update(req.params.id, req.body);
    return res.status(201).json({
      data: response,
      message: "Successfully updated a Tag from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be updated",
      sucess: true,
      err: { error },
    });
  }
}


export const deleteTag = async (req, res) => {
  try {
    const response = await tagService.delete(req.params.id);
    return res.status(201).json({
      data: response,
      message: "Successfully deleted a Tag from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be deleted",
      sucess: true,
      err: { error },
    });
  }
}


const Room = require("../models/Room");
const { StatusCodes } = require("http-status-codes");

const createRoom = async (req, res) => {
  const owner = req.user.userId;
  const { members, name } = req.body;

  const room = await new Room({ members, owner, name });
  await room.populate("members", "firstName lastName");
  const membersInfo = room.members
    .map((member) => member.firstName + " " + member.lastName)
    .join(", ");
  room.name = membersInfo;
  await room.save();
  res.status(StatusCodes.OK).json({ success: true });
};

const updateRoom = async (req, res) => {
  const { name, owner, members } = req.body;
  const { roomId } = req.params;
  const room = await Room.findById(roomId);
  if (!room) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: "Room not found", success: false });
  }
  if (name) {
    room.name = name;
  }
  if (owner) {
    room.owner = owner;
  }
  if (members) {
    room.members = members;
  }
  await room.save();
  res.status(StatusCodes.OK).json({ success: true });
};

const getRoomMessage = async (req, res) => {
  const { roomId, receiverId } = req.body;
};

module.exports = { createRoom, getRoomMessage, updateRoom };


import Notification from '../models/Notification.js';

// Merr të gjitha njoftimet
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Merr një njoftim sipas ID-së
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification && notification.user.toString() === req.user._id.toString()) {
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Krijon një njoftim të ri
export const createNotification = async (req, res) => {
  const { title, content } = req.body;
  try {
    const notification = new Notification({
      title,
      content,
      user: req.user._id,
    });
    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Përditëson një njoftim ekzistues
export const updateNotification = async (req, res) => {
  const { title, content, read } = req.body;
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification && notification.user.toString() === req.user._id.toString()) {
      notification.title = title || notification.title;
      notification.content = content || notification.content;
      notification.read = read !== undefined ? read : notification.read;
      const updatedNotification = await notification.save();
      res.json(updatedNotification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fshin një njoftim
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification && notification.user.toString() === req.user._id.toString()) {
      await notification.remove();
      res.json({ message: 'Notification removed' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


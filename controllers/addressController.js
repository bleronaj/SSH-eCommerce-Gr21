// controllers/addressController.js
import Address from '../models/addressModel.js';

// Shto një adresë të re
export const addAddress = async (req, res) => {
  try {
    const { fullName, addressLine1, addressLine2, city, state, postalCode, country, phoneNumber } = req.body;
    const address = new Address({
      user: req.user._id,
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phoneNumber
    });
    await address.save();
    res.status(201).send({ message: 'Address added successfully', address });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add address', error });
  }
};

// Merr adresat e përdoruesit
export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.send(addresses);
  } catch (error) {
    res.status(500).send({ message: 'Failed to get addresses', error });
  }
};

// Fshij një adresë
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findById(addressId);
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'Unauthorized action' });
    }
    await address.remove();
    res.send({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete address', error });
  }
};

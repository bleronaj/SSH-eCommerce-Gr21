

import asyncHandler from 'express-async-handler';
import FAQ from '../models/FAQ.js';


const getAllFaqs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find({});
  res.json(faqs);
});


const getFaqById = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);

  if (faq) {
    res.json(faq);
  } else {
    res.status(404);
    throw new Error('FAQ not found');
  }
});


const createFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  const faq = await FAQ.create({
    question,
    answer
  });

  if (faq) {
    res.status(201).json({
      _id: faq._id,
      question: faq.question,
      answer: faq.answer
    });
  } else {
    res.status(400);
    throw new Error('Invalid FAQ data');
  }
});


const updateFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  const faq = await FAQ.findById(req.params.id);

  if (faq) {
    faq.question = question;
    faq.answer = answer;

    const updatedFaq = await faq.save();
    res.json(updatedFaq);
  } else {
    res.status(404);
    throw new Error('FAQ not found');
  }
});


const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);

  if (faq) {
    await faq.remove();
    res.json({ message: 'FAQ removed' });
  } else {
    res.status(404);
    throw new Error('FAQ not found');
  }
});

export { getAllFaqs, getFaqById, createFaq, updateFaq, deleteFaq };

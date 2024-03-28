import joi from 'joi';

export const examSchema=joi.object({
    title:joi.string().required(),
    duration:joi.number().required(),
    passingScore:joi.number().required(),
});

export const questionSchema=joi.object({
    id:joi.number().required(),
    question:joi.string().required(),
    answers:joi.array().items(joi.string()).required(),
    correctAnswer:joi.string().required(),
});

export const userSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    learningPath:joi.string().required(),
});

export const validationSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
});


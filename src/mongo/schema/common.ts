export const experienceSchema = {
  position: String,
  company: {
    name: String,
    address: String,
    logo: String,
    image: String,
    link: String,
  },
  period: String,
  skills: [{ name: String, image: String, icon: String }],
  details: [
    {
      type: String,
      single_content: String,
      group_content: {
        title: String,
        icon: String,
        lists: [String],
      },
    },
  ],
};

export const projectSchema = {
  tech_stack: [{ name: String, icon: String, link: String }],
  image: String,
  thumbnail: String,
  name: String,
  link: String,
  group_links: [{ name: String, link: String, icon: String, image: String }],
  details: [{}],
};

export const educationSchema = {
  major: String,
  training_place: {
    name: String,
    logo: String,
    link: String,
    image: String,
  },
  learning_time: String,
  score: String,
  status: String,
  details: [{}],
};

export const summarySchema = {
  my_image: String,
  details: [
    {
      type: String,
      paragraphs: [String],
      lists: {
        title: String,
        icon: String,
        content: [String],
      },
      groups: {
        title: String,
        icon: String,
        paragraphs: [String],
      },
    },
  ],
};

export const skillSchema = {
  title: String,
  score: Number,
  group: {
    name: String,
    image: String,
    icon: String,
    rating: Number,
    score: Number,
  },
};

export const certificationSchema = {
  name: String,
  link: String,
  time: String,
  image: String,
  icon: String,
  details: [{}],
};

export const languageSchema = {
  name: String, // English
  certification: [{ name: String, score: Number }], // TOEIC 900
};

export const achievementSchema = {
  name: String,
  link: String,
  time: String,
  image: String,
  icon: String,
  details: [{}],
  score: Number,
};

export const contactSchema = {
  email: String,
  phone: String,
  address: String,
  email_service: String,
  current_company: String,
  website: String,
  social_media: [{ name: String, icon: String, link: String }],
};

export const iamSchema = {
  position: String,
  iam: String,
  nickname: String,
  icon: String,
  image: String,
};

export const groupImageSchema = { link: String, details: [String] };

export const postSchema = {
  name: String,
  link: String,
  time: String,
  image: String,
  icon: String,
  tags: [String],
  details: [String],
};

export const myselfSchema = {
  details: [
    {
      type: String,
      groups: [
        {
          title: String,
          paragraphs: [String],
          icon: String,
          lists: {
            title: String,
            content: [String],
          },
        },
      ],
    },
  ],
};

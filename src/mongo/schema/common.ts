export const experienceSchema = {
  object_title: String,
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
      paragraph: [String],
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
  object_title: String,
  tech_stack: [{ name: String, icon: String, link: String }],
  image: String,
  thumbnail: String,
  name: String,
  link: String,
  group_links: [{ name: String, link: String, icon: String, image: String }],
  details: [
    {
      type: String,
      paragraph: [String],
    },
  ],
};

export const educationSchema = {
  object_title: String,
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
  details: [
    {
      paragraph: String,
    },
  ],
};

export const summarySchema = {
  object_title: String,
  my_image: String,
  details: [
    {
      paragraph: String,
      lists: [
        {
          content: String,
        },
      ],
      // type: String,
      // paragraphs: [String],
      // lists: {
      //   title: String,
      //   icon: String,
      //   content: [String],
      // },
      // groups: {
      //   title: String,
      //   icon: String,
      //   paragraphs: [String],
      // },
    },
  ],
};

export const skillsSchema = {
  object_title: String,
  lists: [
    {
      name: String,
      score: Number,
      image: String,
      icon: String,
      rating: Number,
      // title: String,
      // score: Number,
      // group: {
      //   name: String,
      //   image: String,
      //   icon: String,
      //   rating: Number,
      //   score: Number,
      // },
    },
  ],
};

export const certificationSchema = {
  object_title: String,
  name: String,
  link: String,
  time: String,
  image: String,
  icon: String,
  details: [{}],
};

export const languageSchema = {
  object_title: String,
  name: String, // English
  certification: [{ name: String, score: Number }], // TOEIC 900
};

export const achievementSchema = {
  object_title: String,
  name: String,
  link: String,
  time: String,
  image: String,
  icon: String,
  details: [{}],
  score: Number,
};

export const contactSchema = {
  object_title: String,
  email: String, // personal email
  phone_number: String,
  address: String,
  email_service: String, // email to contact user, can same or different personal email
  current_company: String,
  website: String,
  social_media: [{ name: String, icon: String, link: String }],
};

export const iamSchema = {
  position: String,
  full_name: String,
  nickname: String,
  icon: String,
  image: String,
};

export const groupImageSchema = { link: String, details: [String] };

export const postSchema = {
  object_title: String,
  name: String,
  link: String,
  time: String,
  image: String,
  icon: String,
  tags: [String],
  details: [String],
};

export const myselfSchema = {
  object_title: String,
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

import UsersModel from "mongo/schema/users";
import { Profile } from "passport-google-oauth20";

export function findGoogleUser(googleAccountId: string) {
  return UsersModel.findOne({ "oauth.google.id": googleAccountId });
}

export function signIn(profile: Profile) {
  return UsersModel.findOneAndUpdate(
    { username: profile.id },
    {
      "oauth.google.displayName": profile.displayName,
      "oauth.google.photos": profile.photos,
      "oauth.google.name": profile.name,
      "oauth.google.emails": profile.emails,
    },
    { upsert: true }
  );
}

export async function signUp(profile: Profile) {
  const userId = await UsersModel.create({
    username: profile.id,
    oauth: {
      google: {
        id: profile.id,
        displayName: profile.displayName,
        photos: profile.photos,
        name: profile.name,
        emails: profile.emails,
      },
    },
  });

  return userId._id;
}

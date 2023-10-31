import { VerifyCallback, Profile } from "passport-google-oauth20";
import { findGoogleUser, signIn, signUp } from "./oauth.service";

export async function googleVerify(profile: Profile, verify: VerifyCallback) {
  const user = await findGoogleUser(profile.id);

  if (!user) {
    const user = await signUp(profile);
    return verify(null, {
      id: user._id,
      emails: profile.emails,
    });
  }

  await signIn(profile);
  return verify(null, {
    id: user._id,
    emails: profile.emails,
  });
}

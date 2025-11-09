"use server";

import { getSessionUser, getUserById } from "@/data/user";
import {
  PersonalInfoFormType,
  ProfileFormType,
  RegisterUserFormType,
} from "@/lib/validationSchema";
import { database } from "@parallane/database";
import bcrypt from "bcrypt";

//* CREATE --------------------------------------------------------

export async function registerUser(data: RegisterUserFormType) {
  const { email, password } = data;

  try {
    const existingUser = await database.user.findFirst({
      where: { email },
    });

    if (existingUser) throw new Error("A user with this email already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await database.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return { success: "User Created Successfully", user: newUser };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function compeleteOnboarding(data: PersonalInfoFormType) {
  const { fullName, country, phoneNumber } = data;
  try {
    const user = await getSessionUser();
    if (!user) return { error: "Unauthorized, Please login again." };

    const existingUserByPhone = await database.user.findFirst({
      where: { phoneNumber },
    });

    if (existingUserByPhone && existingUserByPhone.id !== user.id) {
      return { error: "The phone number is already in use." };
    }

    if (invalidPhoneNumbers.some((invalid) => phoneNumber.endsWith(invalid))) {
      return { error: "Invalid phone number detected." };
    }

    await database.user.update({
      where: { id: user.id },
      data: {
        name: fullName,
        country,
        phoneNumber,
        onboardingCompleted: true,
      },
    });

    return { success: "Onboarding Completed Successfully" };
  } catch (error) {
    return { error: String(error) };
  }
}

const invalidPhoneNumbers = [
  "000000",
  "111111",
  "222222",
  "333333",
  "444444",
  "555555",
  "666666",
  "777777",
  "888888",
  "999999",
  "123456",
  "654321",
  "123123",
  "321321",
];

//* UPDATE --------------------------------------------------------

export const updateUserProfile = async (data: ProfileFormType, id: number) => {
  const { email, name, country, phoneNumber } = data;

  try {
    // USER LOOP UP
    const existingUser = await getUserById(id);
    if (!existingUser) return { error: "user not found" };

    await database.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id },
        data: {
          name,
          email,
          country,
          phoneNumber,
        },
      });

      return updatedUser;
    });

    return { success: "User Updated Successfully" };
  } catch (error) {
    return { error: String(error) };
  }
};

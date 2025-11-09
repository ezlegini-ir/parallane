"use server";

import { getUserById } from "@/data/user";
import { studentFormSchema, StudentFormType } from "@/lib/validationSchema";
import { database } from "@parallane/database";
import { uploadCloudFile } from "@parallane/utils";
import { UploadApiResponse } from "cloudinary";

//* CREATE ------------------------------------------------------------

export async function createUser(data: StudentFormType) {
  const { email, name, image } = data;

  try {
    //  FORM VALIDATION
    const validation = studentFormSchema.safeParse(data);
    if (!validation.success) return { error: "Form Inputs Not Valid" };

    // USER LOOKUP
    const existingUser = await database.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser && existingUser.email === email)
      return { error: "There is already a user with this email." };

    // CREATE USER
    const newUser = await database.user.create({
      data: {
        email: email.toLowerCase(),
        name,
      },
    });

    if (image && image instanceof File) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const { secure_url, public_id, format, bytes } = (await uploadCloudFile(
        buffer,
        {
          folder: "user",
          resource_type: "image",
        }
      )) as UploadApiResponse;

      await database.user.update({
        where: { id: newUser.id },
        data: { image: secure_url },
      });

      // CREATE IMAGE
      await database.image.create({
        data: {
          url: secure_url,
          public_id,
          format,
          size: bytes,
          type: "USER",
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
    }

    return { success: "User Created Successfully" };
  } catch (error) {
    return { error: "Error 500: " + error };
  }
}

//? UPDATE ------------------------------------------------------------

export const updateUser = async (data: StudentFormType, id: number) => {
  const { email, name, image } = data;

  try {
    const existingStudent = await getUserById(id);
    if (!existingStudent) return { error: "No Admin Found" };

    if (id !== existingStudent.id) {
      if (existingStudent && existingStudent.email === email)
        return { error: "User with this Email Already Exists." };
    }

    const updatedUser = await database.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    if (image && image instanceof File) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const { secure_url, public_id, format, bytes } = (await uploadCloudFile(
        buffer,
        {
          folder: "user",
          resource_type: "image",
          width: 300,
        }
      )) as UploadApiResponse;

      await database.user.update({
        where: { id: updatedUser.id },
        data: { image: secure_url },
      });

      await database.image.upsert({
        where: { userId: updatedUser.id },
        update: {
          userId: updatedUser.id,
          url: secure_url,
          type: "USER",
          public_id,
          format,
          size: bytes,
        },
        create: {
          url: secure_url,
          public_id,
          format,
          type: "USER",
          size: bytes,
          user: {
            connect: {
              id: updatedUser.id,
            },
          },
        },
      });
    }

    return { success: "Updated Successfully" };
  } catch (error) {
    return { error: "Error 500: " + error };
  }
};

//! DELETE ------------------------------------------------------------

export const deleteUser = async (id: number) => {
  try {
    const existingAdmin = await getUserById(id);
    if (!existingAdmin) return { error: "No Admin Found" };

    const deletedUser = await database.user.delete({
      where: { id },
    });

    if (!deletedUser) return { error: "Could not remove User" };

    return { success: "Deleted Successfully" };
  } catch (error) {
    return { error: "500: " + error };
  }
};

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  eventImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
  
  
  .onUploadComplete(async ({metadata, file }) => {
    return {
      url: file.ufsUrl,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
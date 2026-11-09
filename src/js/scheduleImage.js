// Schedule image: shows src/img/table.<extension>, so replacing the picture
// needs no source change. Keep only one table.* file in that folder: if there
// are several, the first extension in this list wins.

const IMAGE_BASE = "./src/img/table";
const EXTENSIONS = ["jpg", "png", "jpeg", "webp", "avif", "JPG", "PNG", "JPEG"];

async function findScheduleImage() {
  for (const extension of EXTENSIONS) {
    try {
      // "no-cache" asks the server every time, so a replaced file with the
      // same name shows up immediately instead of the browser's old copy
      const response = await fetch(`${IMAGE_BASE}.${extension}`, {
        cache: "no-cache",
      });
      if (response.ok) return URL.createObjectURL(await response.blob());
    } catch (error) {
      console.error(error);
    }
  }
  return null;
}

export async function initializeScheduleImage() {
  const image = document.querySelector("#schedule-image");
  const empty = document.querySelector("#schedule-empty");
  if (!image || !empty) return;

  const source = await findScheduleImage();
  if (source) {
    image.src = source;
    image.hidden = false;
  } else {
    empty.hidden = false;
  }
}

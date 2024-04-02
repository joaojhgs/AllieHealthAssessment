import { Request, Response, Router } from "express";
import { db } from "./db";
import multer from "multer";
import os from "os";

const router = Router();

const upload = multer({ dest: os.tmpdir() });

const usersParameterMap: Record<string, string> = {
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  birthDate: "birth_date",
};

router.get("/users", (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();

  res.json({
    users: users,
  });
});

router.post("/users", (req: Request, res: Response) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.birthDate
  ) {
    res.sendStatus(400);
    return;
  }

  const user = db
    .prepare(
      "INSERT INTO users (first_name, last_name, email, birth_date) VALUES (@firstName, @lastName, @email, @birthDate) RETURNING id, first_name, last_name, email, birth_date",
    )
    .get({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthDate: req.body.birthDate,
    });

  res.json(user);
});

router.put("/users/:userId", (req: Request, res: Response) => {
  if (Object.keys(req.body).length < 1) {
    res.sendStatus(400);
    return;
  }

  Object.keys(req.body).forEach((key) => {
    if (!usersParameterMap[key]) {
      res.sendStatus(400);
      return;
    }
  });

  let updateQuery = `UPDATE users \nSET `;
  Object.entries(req.body).forEach(([key, value], index) => {
    updateQuery = updateQuery.concat(
      `${usersParameterMap[key]} = '${value}'${index !== Object.entries(req.body).length - 1 ? ", " : ""} `,
    );
  });
  updateQuery = updateQuery.concat(`\nWHERE id = ${req.params.userId};`);
  const getQuery = `\nSELECT id, first_name, last_name, email, birth_date FROM users WHERE id = ${req.params.userId};`;

  db.prepare(updateQuery).run();
  const user = db.prepare(getQuery).get();

  res.json(user);
});

router.post(
  "/users/bulk",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;

    console.log(file);

    res.sendStatus(200);
  },
);

export default router;

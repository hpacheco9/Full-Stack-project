import { query } from "./database.js";
import bcrypt from "bcrypt";
import { UserExistError } from "../errors/user.js";

/* FROM DATABASE */

// Get all users
export async function getAllUsers() {
  return await query("SELECT * FROM users");
}

// Get user by username
export async function getUser(username) {
  const { result } = await query(
    `SELECT * FROM users WHERE username="${username}"`
  );
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

function generatePasswordHash(password) {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    // Generate password hash
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        return reject(err);
      }
      return resolve(hash);
    });
  });
}

// Create user
export async function create(user) {
  // make sure that the user does not exist
  const { username, password } = user;
  const existingUser = await getUser(username);
  if (!existingUser) {
    const passwordHash = await generatePasswordHash(password);
    let q = `
            INSERT INTO \`users\` (
                \`username\`,
                \`email\`,
                \`firstName\`,
                \`lastName\`,
                \`passwordHash\`
            )
            VALUES
            (
                "${user.username}",
                "${user.email}",
                "${user.firstName}",
                "${user.lastName}",
                "${passwordHash}"
            );
        `;

    q = q.replace("\n", "");
    await query(q);
    return await getUser(user.username);
  }
  throw new UserExistError("User already exists...");
}

// Update user
function update(username, updatedUser) {}

// Delete user
export async function remove(username) {
  await query(`DELETE FROM users WHERE username="${username}"`);
}

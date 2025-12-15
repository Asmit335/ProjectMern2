import User from "./database/model/useModel";
import bcrypt from "bcrypt";
const adminSeeder = async (): Promise<void> => {
  const data = await User.findOne({
    where: {
      email: "akadmin@gmail.com",
    },
  });
  if (!data) {
    await User.create({
      email: "akadmin@gmail.com",
      password: bcrypt.hashSync("pa$$w0rd", 8),
      username: "AdminBro",
      role: "admin",
    });
    console.log("Admin credential Seeded Successfully.");
  } else {
    console.log("Admin credential Already Seeded.");
  }
};
export default adminSeeder;

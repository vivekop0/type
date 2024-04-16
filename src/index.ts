
// interface User {
//     id: number;
//     name: string;
//     email: string;
//     createdAt: Date;
//   }
// type UserProfile = Pick<User, 'name' | 'email'>;


// const displayUserProfile = (user: UserProfile) => {
//   console.log(`Name: ${user.name}, Email: ${user.email}`);
// };

// interface Config {
//     endpoint: string;
//     apiKey: string;
//   }


// const config: Readonly<Config> = {
//   endpoint: '<https://api.example.com>',
//   apiKey: 'abcdef123456',
// };


// interface User {
//     id: string;
//     name: string;
//   }
  
//   // Using Record to type an object with string keys and User values
//   type Users = Record<string, User>;
  
//   const users: Users = {
//     'abc123': { id: 'abc123', name: 'John Doe' },
//     'xyz789': { id: 'xyz789', name: 'Jane Doe' },
//   };
  
//   console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }
//   interface User {
//   id: string;
//   name: string;
// }

// // Initialize an empty Map with string keys and User values
// const usersMap = new Map<string, User>();

// // Add users to the map using .set
// usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
// usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// // Accessing a value using .get
// console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }

// interface User {
//     id: string;
//     name: string;
//   }
  
//   // Initialize an empty Map with string keys and User values
//   const usersMap = new Map<string, User>();
  
//   // Add users to the map using .set
//   usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
//   usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
  
//   // Accessing a value using .get
//   console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }



/// zod 

import { z } from 'zod';
import express from "express";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  // Type of updateBody is inferred from userProfileSchema
  const updateBody = result.data;

  // update database here
  res.json({
    message: "User updated",
    updateBody
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
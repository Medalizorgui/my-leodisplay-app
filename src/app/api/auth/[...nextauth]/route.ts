import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import  prisma  from '@/lib/prisma'; // Adjust path as necessary
import { compare } from 'bcrypt';

// Define the User type locally in this file with `id` as a string
type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn:'/'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        // Log attempt to sign in
        console.log(`Attempting login for email: ${email}`);
        
        // Find user by email
        const user = await prisma.customer.findUnique({ where: { email } });
        if (!user) {
          console.log('User not found');
          throw new Error("User not found");
        }

        // Check password
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          console.log('Invalid password');
          throw new Error("Invalid password");
        }

        console.log('User authenticated successfully');
        
        // Return user object
        return { id: String(user.id), email: user.email, name: user.nom, role: user.role };
      },
    }),
  ],
});

export { handler as GET, handler as POST };

import Image from "next/image";
import SignInForm from "./signInForm";
import cover from "./public/login cover.png";
import { Box, Container, Grid } from "@radix-ui/themes";
import SignInUpForm from "./signUpForm";

export default function Home({
  searchParams,
}: {
  searchParams: { signUp: string; successfuly: string };
}) {
  const signUp = searchParams.signUp;

  return (
    <Container>
      <div className="sm:m-4">
        <Grid
          columns={{ initial: "1", md: "2" }}
          align="center"
          gap="4"
          className="min-h-dvh"
        >
          {signUp ? <SignInUpForm /> : <SignInForm />}
          <Box position="relative">
            <Image src={cover} alt="cover" className="w-full" />
            <Box
              position="absolute"
              top="0"
              left="0"
              className="bg- w-full h-full"
            ></Box>
          </Box>
        </Grid>
      </div>
    </Container>
  );
}

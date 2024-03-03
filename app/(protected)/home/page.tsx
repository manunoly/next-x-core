'use server';
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { currentUser } from "@/lib/auth";

const HomePage = async () => {
  const user = await currentUser();
  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            ⚙️ Home
          </p>
        </CardHeader>
        <CardContent>
          <h1>Hello World!</h1>
        </CardContent>
      </Card>
    </>
  );
}

export default HomePage;
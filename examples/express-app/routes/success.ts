import type { Route } from "@nordjs/types";
import { BadRequestException } from "@nordjs/errors";

/**
 * Returns a success message, and randomly throws a bad request exception
 * @tag Users, Login
 * @response 200 - You'll get a success message 75% of the times
 * @response 400 - You have a 25% chance to get this error
 */
export const get: Route = async (): Promise<{ success: boolean }> => {
  if (Math.random() < 0.25)
    throw new BadRequestException("Test exception is bad");
  return { success: true };
};

export const post: Route<{
  body: {
    /**
     * First name of the customer
     * @maxLength 64
     */
    name: string;
  };
}> = ({ body }): { result: string } => {
  const { name } = body();
  return { result: `hello ${name}` };
};

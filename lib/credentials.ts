import { getPassword, getUsername } from "@/db/randomizer";

export type Credentials = {
    username: string;
    password: string;
};

export function generateCredentials(): Credentials {
    return {
        username: getUsername(),
        password: getPassword(),
    };
}

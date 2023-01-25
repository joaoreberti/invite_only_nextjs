import type { NextPage } from "next";
import useInvite from "../hooks/useInvite";

const Home: NextPage = () => {
  const [inviteResponse, error] = useInvite();
  if (error) {
    return <div>there was an error</div>;
  }
  if (!inviteResponse) return <div>loading...</div>;
  console.log({ inviteResponse });

  return <div>loaded {JSON.stringify(inviteResponse)}</div>;
};

export default Home;

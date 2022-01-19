import styled from 'styled-components';
import Head from 'next/head';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <GridStyles>
      <Head>
        <title>Sign-In Center</title>
      </Head>
      <SignIn />
      <SignUp />
      <RequestReset />
    </GridStyles>
  );
}

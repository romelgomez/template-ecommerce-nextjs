import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Gutter } from "../../components/Gutter";
import { getApolloClient } from "../../graphql";
import { QUERY_HEADER } from "../../graphql/header";
import { useAuth } from "../../providers/Auth";
import classes from './index.module.css';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        setSuccess('Logged out successfully.');
      } catch (_) {
        setError('You are already logged out.');
      }
    }

    performLogout();
  }, [logout]);

  return (
    <Gutter>
      {success && (
        <h1>{success}</h1>
      )}
      {error && (
        <div className={classes.error}>
          {error}
        </div>
      )}
    </Gutter>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = getApolloClient();

  const { data } = await apolloClient.query({
    query: QUERY_HEADER
  });

  return {
    props: {
      header: data?.Header || null,
      footer: data?.Footer || null,
    },
  };
}

export default Logout;

import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An Error occured</h1>
        <p>could not find this page</p>
      </main>
    </>
  );
};

export default ErrorPage;

import React from "react";
import { useState } from "react";
import getConfig from "next/config";
import Head from "next/head";
import Image from "next/image";
import Container from "../components/Container";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const onChange = (name, value) => setFormData({ ...formData, [name]: value });
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    await login({ username, password });
  };
  return (
    <>
      <Head>
        <title>Dow Dash - Login</title>
        <meta name="description" content="Dow bot dashboard login" />
      </Head>
      <main>
        <section className="gradient-form bg-gray-200 h-screen">
          <Container className={"py-12 px-6 h-full mx-auto"}>
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 mx-auto">
              <div className="xl:w-10/12">
                <div className="block bg-white shadow-lg rounded-lg">
                  <div className="lg:flex lg:flex-wrap g-0">
                    <div className="lg:w-6/12 px-4 md:px-0">
                      <div className="md:p-12 md:mx-6">
                        <div className="text-center">
                          <Image
                            className="mx-auto w-48"
                            src="/icons/dow-dash-logo.svg"
                            width={200}
                            height={200}
                            alt="Dow Dash Logo"
                          />
                          <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                            Dow dashboard login
                          </h4>
                        </div>
                        <form onSubmit={onSubmit}>
                          <p className="mb-4">Please login to your account</p>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-slate-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none"
                              id="exampleFormControlInput1"
                              placeholder="Username"
                              onChange={(e) =>
                                onChange("username", e.target.value)
                              }
                              value={formData?.username}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-slate-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none"
                              id="exampleFormControlInput1"
                              placeholder="Password"
                              onChange={(e) =>
                                onChange("password", e.target.value)
                              }
                              value={formData?.password}
                              required
                            />
                          </div>
                          <div className="text-center pt-1 mb-12 pb-1">
                            <button
                              className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded bg-slate-900 shadow-md hover:bg-black hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="submit"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                            >
                              Log in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="hidden lg:flex lg:w-6/12 items-center bg-slate-900 lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                      <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                        <p className="text-sm">
                          <Image
                            src="/icons/user-logo.svg"
                            width={600}
                            height={600}
                            alt="User Logo"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};
Login.getInitialProps = async () => {
  const { publicRuntimeConfig } = getConfig();
  const { apiUrl, socketUrl } = publicRuntimeConfig;
  return { apiUrl, socketUrl };
};
export default Login;

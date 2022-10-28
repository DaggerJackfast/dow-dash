import Head from "next/head";
import Favicon from "../components/Favicon";
import Container from "../components/Container";
import Image from 'next/image';

export default function Login() {
    return (
        <>
            <Head>
                <title>Dow Dash - Login</title>
                <meta name="description" content="Dow bot dashboard login"/>
                <Favicon/>
            </Head>
            <main>
              <section class="gradient-form bg-gray-200 h-screen">
                  <div class="container py-12 px-6 h-full">
                    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                      <div class="xl:w-10/12">
                        <div class="block bg-white shadow-lg rounded-lg">
                          <div class="lg:flex lg:flex-wrap g-0">
                            <div class="lg:w-6/12 px-4 md:px-0">
                              <div class="md:p-12 md:mx-6">
                                <div class="text-center">
                                  <Image
                                    class="mx-auto w-48"
                                    src="/icons/dow-dash-logo.svg"
                                    width={200}
                                    height={200}
                                    alt="Dow Dash Logo"
                                  />
                                  <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">Dow dashboard login</h4>
                                </div>
                                <form>
                                  <p class="mb-4">Please login to your account</p>
                                  <div class="mb-4">
                                    <input
                                      type="text"
                                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-slate-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none"
                                      id="exampleFormControlInput1"
                                      placeholder="Username"
                                    />
                                  </div>
                                  <div class="mb-4">
                                    <input
                                      type="password"
                                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-slate-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none"
                                      id="exampleFormControlInput1"
                                      placeholder="Password"
                                    />
                                  </div>
                                  <div class="text-center pt-1 mb-12 pb-1">
                                    <button
                                      class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded bg-slate-900 shadow-md hover:bg-black hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                      type="button"
                                      data-mdb-ripple="true"
                                      data-mdb-ripple-color="light"
                                    >
                                      Log in
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div
                              class="hidden lg:flex lg:w-6/12 items-center bg-slate-900 lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                            >
                              <div class="text-white px-4 py-6 md:p-12 md:mx-6">
                                <p class="text-sm">
                                  <Image src="/icons/user-logo.svg" width={600} height={600} alt="User Logo" />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
            </main>
        </>
    )
}
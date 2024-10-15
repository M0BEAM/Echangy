import NavBar from "../../tailwind/navBar";
import Footer from "./footer";

const Learn = () => {
    return (
        <>
            <NavBar />
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Echangy ?</h2>
                        <p class="mb-4 font-light">your go-to platform for seamless device and item exchanges. Whether you're looking to upgrade your phone, trade in your old laptop, or swap books for a fresh read, Echangy simplifies the exchange process for people across Tunisia. </p>
                        <p class="mb-4 font-medium">With just a few taps, you can connect with fellow users and initiate exchanges using their listed phone numbers right here on the platform. Say goodbye to unused items gathering dust and hello to a vibrant community of exchange enthusiasts on Echangy!</p>
                        <a href="/" class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                           Home
                            <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Learn;
import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import Accordin from './Accordion';

const AboutPage = () => {
  return (
  <>
  <MainNavbar/>
    <div >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Image */}
        <div className="mb-8">
          <img
            src="https://www.quadlabs.com/blog/wp-content/uploads/2017/07/blog-picture2@low-1-1.jpg"
            alt="About Us"
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Explore with Us Section */}
        <div className="flex flex-wrap">
  {/* Explore with Us Section */}
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4">
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Explore with Us
      </h2>
      <p className="text-lg text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        scelerisque vehicula nisi, ac dignissim libero aliquet non. Sed
        vestibulum neque vitae tellus fermentum, sit amet tempus mi pharetra.
      </p>
    </section>
  </div>

  {/* Always Available Section */}
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4">
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Always Available
      </h2>
      <p className="text-lg text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        scelerisque vehicula nisi, ac dignissim libero aliquet non. Sed
        vestibulum neque vitae tellus fermentum, sit amet tempus mi pharetra.
      </p>
    </section>
  </div>

  {/* Fast Services Section */}
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4">
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Fast Services
      </h2>
      <p className="text-lg text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        scelerisque vehicula nisi, ac dignissim libero aliquet non. Sed
        vestibulum neque vitae tellus fermentum, sit amet tempus mi pharetra.  </p>
    </section>
  </div>
</div>


        {/* Feedback Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Feedback
          </h2>
          <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />Michael Gough</p>

        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
        instruments for the UX designers. The knowledge of the design tools are as important as the
        creation of the design strategy.</p>
    
    </article>
        </section>
      </div>
    </div>
    <Accordin/>
    <Footer/>
  </>
  );
};

export default AboutPage;

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8">

          <div>
            <h3 className="text-xl font-semibold mb-4">SocialMedia</h3>
            <p className="text-gray-300">
              A place to connect, share, and explore. Join our community and stay up to date with the latest trends.
            </p>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-gray-200">Home</a></li>
              <li><a href="#" className="hover:text-gray-200">About</a></li>
              <li><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-200">Terms of Service</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="mailto:support@socialmedia.com" className="hover:text-gray-200">support@socialmedia.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-gray-200">+1 234 567 890</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>


        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} SocialMedia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

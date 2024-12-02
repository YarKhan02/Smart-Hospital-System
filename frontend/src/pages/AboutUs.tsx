import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-600">About Our Project</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital Management System</h2>
          <p className="text-lg text-gray-600 mb-4">
            Our Hospital Management System is a comprehensive digital solution designed to streamline healthcare operations, 
            enhance patient care, and improve overall efficiency in hospital settings. This project was developed as part of 
            our commitment to advancing healthcare technology and management.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/amna-avatar.jpg" alt="Amna" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  Amna
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Amna is a talented software developer with a passion for healthcare technology. Her expertise in 
                  frontend development and user experience design was crucial in creating an intuitive interface for our system.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/wali-avatar.jpg" alt="Wali" />
                    <AvatarFallback>W</AvatarFallback>
                  </Avatar>
                  Wali
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Wali is an experienced backend developer with a strong background in database management and system architecture. 
                  His skills were essential in developing the robust backend infrastructure of our Hospital Management System.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Patient registration and management</li>
            <li>Appointment scheduling and tracking</li>
            <li>Electronic health records (EHR) system</li>
            <li>Billing and insurance management</li>
            <li>Inventory and pharmacy management</li>
            <li>Staff management and scheduling</li>
            <li>Reporting and analytics dashboard</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600">
            We are committed to improving healthcare delivery through innovative technology solutions. Our Hospital Management 
            System aims to empower healthcare providers with tools that enhance efficiency, reduce errors, and ultimately 
            improve patient outcomes.
          </p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Hospital Management System by Amna and Wali. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


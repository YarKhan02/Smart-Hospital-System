import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Calendar, Clock, User, Phone, MapPin } from 'lucide-react'

export default function HospitalFrontPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Smart AW Hospital</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/about" className="text-gray-600 hover:text-blue-600">About Us</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Smart AW Hospital</h2>
          <p className="text-xl text-gray-600 mb-8">Providing compassionate care and cutting-edge medical services to our community.</p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <a href="/login" target="_blank" rel="noopener noreferrer">Doctor</a>
            </Button>
            <Button size="lg" asChild>
              <a href="/dashboard" target="_blank" rel="noopener noreferrer">Reception</a>
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-6 w-6" />
                Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>24/7 emergency care for critical medical situations.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-6 w-6" />
                Specialized Care
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Expert doctors across various medical specialties.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-6 w-6" />
                Outpatient Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Convenient outpatient care for routine check-ups and treatments.</p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-blue-50 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Smart AW Hospital?</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>State-of-the-art medical facilities</li>
            <li>Experienced and compassionate medical staff</li>
            <li>Comprehensive range of medical services</li>
            <li>Patient-centered approach to healthcare</li>
            <li>Convenient location and ample parking</li>
          </ul>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <Phone className="mr-2 h-6 w-6 text-blue-600" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-blue-600" />
              <span>FAST NUCES</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Smart AW Hospital. All rights reserved.</p>
          <div className="mt-4">
            <a href="/privacy" className="text-gray-300 hover:text-white mr-4">Privacy Policy</a>
            <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, Cloud, Search } from 'lucide-react';
import heroImage from '@/assets/hero-notes.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              Your Digital Notebook
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Capture Your
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Best Ideas
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A beautiful, secure notes app built with modern technology. 
              Write, organize, and find your thoughts effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="text-lg px-8 py-6 shadow-[var(--shadow-card)]"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="text-lg px-8 py-6"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything you need for note-taking
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-[var(--shadow-soft)]">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Rich Editor</h3>
              <p className="text-muted-foreground">
                Write with a clean, distraction-free editor designed for productivity
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-[var(--shadow-soft)]">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Secure Auth</h3>
              <p className="text-muted-foreground">
                Your notes are protected with enterprise-grade encryption
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-[var(--shadow-soft)]">
                <Cloud className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Cloud Sync</h3>
              <p className="text-muted-foreground">
                Access your notes anywhere, synced seamlessly across devices
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-[var(--shadow-soft)]">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Fast Search</h3>
              <p className="text-muted-foreground">
                Find any note instantly with powerful search functionality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-br from-primary to-accent p-12 rounded-3xl text-primary-foreground shadow-[var(--shadow-card)]">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to organize your thoughts?
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of users who trust NotesApp for their note-taking needs
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-6 mt-4"
            >
              Start Writing Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 NotesApp. Built with React, TypeScript & Lovable Cloud.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import Link from "next/link";
import {
  CheckCircle,
  ShoppingCart,
  Calendar,
  Package,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="from-muted/60 to-muted/40 border-muted flex w-full justify-center border-b bg-gradient-to-br px-4 py-12 md:px-6 md:py-24 lg:py-32 xl:py-48">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-6">
                  <Badge variant="secondary" className="w-fit">
                    Smart Meal Planning
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                    Plan Meals, Shop Smart, Cook with Confidence
                  </h1>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl">
                    The intelligent meal planner that automatically manages your
                    shopping lists and kitchen inventory. Never run out of
                    ingredients or waste food again.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button size="lg" variant="brand">
                    Start Planning Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="text-brand h-4 w-4" />
                    Free 14-day trial
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="text-brand h-4 w-4" />
                    No credit card required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="flex w-full justify-center px-4 py-12 md:px-6 md:py-24 lg:py-32"
        >
          <div className="container">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Everything You Need for Effortless Meal Planning
              </h2>
              <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From planning to cooking, MealPlanner handles the complexity so
                you can focus on enjoying great meals.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="min-h-full">
                <CardContent className="flex flex-col gap-6">
                  <Calendar className="text-brand h-10 w-10" />
                  <div className="flex flex-col gap-2">
                    <CardTitle>Smart Meal Planning</CardTitle>
                    <CardDescription>
                      Plan your meals for the week with our intuitive calendar
                      interface. Add items and create custom meals effortlessly.
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
              <Card className="min-h-full">
                <CardContent className="flex flex-col gap-6">
                  <ShoppingCart className="text-brand h-10 w-10" />
                  <div className="flex flex-col gap-2">
                    <CardTitle>Automatic Shopping Lists</CardTitle>
                    <CardDescription>
                      Generate shopping lists automatically based on your meal
                      plans and current stock levels. Never forget an ingredient
                      again.
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
              <Card className="min-h-full">
                <CardContent className="flex flex-col gap-6">
                  <Package className="text-brand h-10 w-10" />
                  <div className="flex flex-col gap-2">
                    <CardTitle>Intelligent Stock Management</CardTitle>
                    <CardDescription>
                      Track your pantry inventory automatically. Stock
                      replenishes as you shop and cook, keeping everything up to
                      date.
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="from-muted/60 to-muted/40 border-muted flex w-full justify-center border-t border-b bg-gradient-to-br px-4 py-12 md:px-6 md:py-24 lg:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  How It Works
                </h2>
                <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Four simple steps to transform your meal planning experience
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 lg:gap-8">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="bg-brand-foreground flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-brand text-2xl font-bold">1</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Add Items & Meals</h3>
                  <p className="text-muted-foreground">
                    Build your ingredient database and create custom meal
                    recipes
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="bg-brand-foreground flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-brand text-2xl font-bold">2</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Plan Your Week</h3>
                  <p className="text-muted-foreground">
                    Schedule meals on your calendar and let the app track what
                    you need
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="bg-brand-foreground flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-brand text-2xl font-bold">3</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Shop Smart</h3>
                  <p className="text-muted-foreground">
                    Get auto-generated shopping lists and tick off items as you
                    buy them
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="bg-brand-foreground flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-brand text-2xl font-bold">4</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Cook & Track</h3>
                  <p className="text-muted-foreground">
                    Mark meals as cooked and watch your stock levels update
                    automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="flex w-full justify-center px-4 py-12 md:px-6 md:py-24 lg:py-32">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Save Time, Money, and Reduce Food Waste
                  </h2>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    MealPlanner users report significant improvements in their
                    kitchen efficiency and grocery spending.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-brand h-5 w-5" />
                    <span>Save 3+ hours per week on meal planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-brand h-5 w-5" />
                    <span>Reduce grocery spending by up to 25%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-brand h-5 w-5" />
                    <span>Cut food waste by 40% with better planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-brand h-5 w-5" />
                    <span>Never run out of ingredients mid-recipe</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid w-full max-w-sm gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-brand-foreground rounded-full p-3">
                          <Users className="text-brand h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">10,000+</div>
                          <div className="text-muted-foreground text-sm">
                            Happy families
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-brand-foreground rounded-full p-3">
                          <Star className="text-brand h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">4.9/5</div>
                          <div className="text-muted-foreground text-sm">
                            App store rating
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="from-muted/60 to-muted/40 border-muted flex w-full justify-center border-t bg-gradient-to-br px-4 py-12 md:px-6 md:py-24 lg:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  What Our Users Say
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="min-h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "MealPlanner has completely transformed how our family
                    approaches meal planning. No more last-minute grocery runs!"
                  </p>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-muted-foreground text-sm">
                    Mother of 3
                  </div>
                </CardContent>
              </Card>
              <Card className="min-h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The automatic stock management is genius. I always know
                    exactly what I have and what I need to buy."
                  </p>
                  <div className="font-semibold">Mike Chen</div>
                  <div className="text-muted-foreground text-sm">Home Chef</div>
                </CardContent>
              </Card>
              <Card className="min-h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "We've cut our grocery bill by 30% and waste so much less
                    food. This app pays for itself!"
                  </p>
                  <div className="font-semibold">Emma Davis</div>
                  <div className="text-muted-foreground text-sm">
                    Budget-conscious Cook
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="via-brand flex w-full justify-center bg-gradient-to-br from-sky-600 to-indigo-800 py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to Transform Your Meal Planning?
                </h2>
                <p className="mx-auto max-w-[600px] text-white/75 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of families who have simplified their kitchen
                  management with MealPlanner.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" variant="brand-inverted">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-white/75">
                14-day free trial • No credit card required • Cancel anytime
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} MealPlanner. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

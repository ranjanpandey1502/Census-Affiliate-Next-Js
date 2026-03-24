import { ScrollReveal } from './ScrollReveal';

const stats = [
  { value: '10,000+', label: 'Active Affiliates' },
  { value: '50+', label: 'Partner Countries' },
  { value: '$2M+', label: 'Commissions Paid' },
  { value: '4.9/5', label: 'Average Rating' },
];

export function Stats() {
  return (
    <section className="relative z-20 -mt-12 sm:-mt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-border/50 p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x-0 md:divide-x divide-border">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center px-4">
                <span className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

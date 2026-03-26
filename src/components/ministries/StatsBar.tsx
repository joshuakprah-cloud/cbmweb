interface Stat {
  label: string;
  value: string;
}

interface StatsBarProps {
  stats: Stat[];
  showDisclaimer?: boolean;
}

const StatsBar: React.FC<StatsBarProps> = ({ stats, showDisclaimer = false }) => {
  if (!stats || stats.length === 0) {
    return (
      <>
        <section className="bg-neutral-900 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-white">
                  <div className="text-3xl font-bold mb-2">—</div>
                  <div className="text-sm text-gray-400">—</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {showDisclaimer && (
          <div className="bg-neutral-900 px-4 pb-8">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-sm text-gray-400">
                Figures are approximate and updated periodically.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <section className="bg-neutral-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showDisclaimer && (
        <div className="bg-neutral-900 px-4 pb-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-gray-400">
              Figures are approximate and updated periodically.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StatsBar;

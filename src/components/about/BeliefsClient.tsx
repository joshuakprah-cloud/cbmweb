'use client';

interface BeliefsClientProps {
  beliefs: any[];
  beliefsPdf?: any;
}

interface Belief {
  title: string;
  description: string;
  scriptureReferences?: string[];
}

// Default beliefs data
const defaultBeliefs: Belief[] = [
  {
    title: 'The Bible',
    description: "The Bible is God's Word to all people. It was written by human authors under the supernatural guidance of the Holy Spirit. Because it was inspired by God, the Bible is truth without any mixture of error and is completely relevant to our daily lives.",
    scriptureReferences: ['Deuteronomy 4:1-2', 'Psalm 119:11, 89, 105', 'Isaiah 40:8', 'Matthew 22:29', 'John 5:39; 16:13-15; 17:17', 'Romans 15:4', '2 Timothy 3:15-17', 'Hebrews 1:1-2; 4:12', '1 Peter 1:25', '2 Peter 3:16']
  },
  {
    title: 'Trinity',
    description: 'God has existed in relationship with Himself for all eternity. He exists as one substance in three persons: the Father, the Son, and the Holy Spirit. Although each member of the Trinity serves different functions, they each possess equal power and authority.',
    scriptureReferences: ['Deuteronomy 6:4', 'Isaiah 61:1', 'Matthew 28:19', 'Mark 1:9-11', 'Luke 1:35', 'John 5:21-23; 14:10, 16', 'Romans 8:9-11', '1 Corinthians 8:6', '2 Corinthians 13:14', 'Hebrews 1:8-10', 'James 2:19']
  },
  {
    title: 'The Father',
    description: 'God is great: He is all-powerful, all-knowing, ever-present, unchanging, completely worthy of our trust, and above all, holy. It is in Him that we live, move, and exist. God is good. He is our Father. He is loving, compassionate, and faithful to His people and His promises.',
    scriptureReferences: ['Exodus 3:14', 'Numbers 23:19', 'Leviticus 11:44-45; 19:2', 'Psalm 11:4-6', 'Malachi 3:6', 'John 3:16; 4:24; 5:26; 14:1', 'Acts 17:28', 'Romans 3:3-4']
  }
];

export default function BeliefsClient({ beliefs }: BeliefsClientProps) {
  const displayBeliefs = beliefs?.length > 0 ? beliefs : defaultBeliefs;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[13px] uppercase tracking-[0.08em] text-white/60 font-medium">
          What we believe
        </span>
        <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white leading-[1.15] mt-3">
          ThaGospel Church Beliefs
        </h2>
        <p className="text-[16px] md:text-[17px] text-white/70 leading-[1.7] mt-4 max-w-[800px]">
          See how we view God, Jesus, the Bible, man, and many significant aspects of our faith. Firmly rooted in scripture, the beliefs of ThaGospel guide our decisions as a church.
        </p>
      </div>

      {/* Beliefs List */}
      <div className="space-y-10">
        {displayBeliefs.map((belief, index) => (
          <div key={index} className="border-b border-white/10 pb-10 last:border-b-0">
            <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-3">
              {belief.title}
            </h3>
            <p className="text-[15px] text-white/70 leading-[1.8] mb-4">
              {belief.description}
            </p>
            
            {/* Scripture References */}
            {belief.scriptureReferences && belief.scriptureReferences.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {belief.scriptureReferences.map((reference: string, refIndex: number) => (
                  <span
                    key={refIndex}
                    className="inline-flex items-center px-3 py-1.5 bg-white/10 rounded-full text-[13px] text-white/80 font-medium"
                  >
                    {reference}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

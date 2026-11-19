import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { RatingStars } from '../reviews/RatingStars';
import { RiskScoreGauge } from '../reviews/RiskScoreGauge';
import { DetectionReasonList } from '../reviews/DetectionReasonList';
import { analyzeReviewContent } from '../../utils/reviewAnalysis';
import { Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEMO_SAMPLES = [
  {
    label: 'Suspicious Bot Burst',
    text: 'BEST PRODUCT EVER!! BUY NOW BUY NOW!! AMAZING SOUND WOW WOW WOW!! ORDER TODAY!',
    rating: 5,
  },
  {
    label: 'Authentic Critical Review',
    text: 'The sound quality is crisp, but the headband feels slightly tight around the ears after 2 hours of use.',
    rating: 3,
  },
  {
    label: 'Sentiment Inversion',
    text: 'Terrible build broke within three days completely useless waste of money.',
    rating: 5,
  },
];

export function LiveDemoWidget() {
  const [text, setText] = useState(DEMO_SAMPLES[0].text);
  const [rating, setRating] = useState(DEMO_SAMPLES[0].rating);
  const [result, setResult] = useState(() =>
    analyzeReviewContent({ text: DEMO_SAMPLES[0].text, rating: DEMO_SAMPLES[0].rating })
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectSample = (sample) => {
    setText(sample.text);
    setRating(sample.rating);
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeReviewContent({ text: sample.text, rating: sample.rating }));
      setIsAnalyzing(false);
    }, 300);
  };

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeReviewContent({ text, rating }));
      setIsAnalyzing(false);
    }, 300);
  };

  return (
    <section id="demo" className="py-20 bg-slate-50 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
            Live Interactive Sandbox
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark mt-2">
            Try the Review Intelligence Engine Now
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Paste any customer review below or select a sample preset to test our multi-signal heuristics in real time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-brand-border shadow-card p-6 sm:p-8">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-brand-muted mr-1">
              Test Presets:
            </span>
            {DEMO_SAMPLES.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(s)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-[#635BFF] border border-brand-border transition-colors flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-[#635BFF]" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Input & Output Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1.5">
                  Review Text to Audit
                </label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste review snippet here..."
                  className="w-full p-3.5 text-xs sm:text-sm bg-slate-50/50 border border-brand-border rounded-xl text-brand-dark focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-muted font-medium">Assigned Rating:</span>
                  <RatingStars rating={rating} size="sm" interactive onChange={setRating} />
                  <span className="text-xs font-bold text-brand-dark">{rating}.0</span>
                </div>

                <Button
                  variant="ai"
                  size="sm"
                  loading={isAnalyzing}
                  icon={Sparkles}
                  onClick={handleAnalyze}
                  className="w-full sm:w-auto"
                >
                  Analyze Content
                </Button>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-50 border border-brand-border flex flex-col items-center justify-center text-center">
              {result && (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-brand-border">
                    <span className="font-semibold text-brand-dark">Verdict:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        result.verdict === 'Genuine Review'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {result.verdict}
                    </span>
                  </div>

                  <RiskScoreGauge score={result.fakeProbability} size={110} />

                  <div className="text-left pt-2">
                    <span className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                      Key Detected Signals:
                    </span>
                    <DetectionReasonList reasons={result.detectionReasons.slice(0, 2)} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="mt-6 pt-4 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-brand-muted">
              Want continuous automated catalog ingestion and API webhooks?
            </span>
            <Link to="/register">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


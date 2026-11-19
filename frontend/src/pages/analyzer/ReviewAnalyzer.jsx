import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { RatingStars } from '../../components/reviews/RatingStars';
import { RiskBadge } from '../../components/reviews/RiskBadge';
import { SentimentBadge } from '../../components/reviews/SentimentBadge';
import { RiskScoreGauge } from '../../components/reviews/RiskScoreGauge';
import { DetectionReasonList } from '../../components/reviews/DetectionReasonList';
import { analyzeReviewContent } from '../../utils/reviewAnalysis';
import { useToast } from '../../hooks/useToast';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Zap,
  Info,
  Clock,
  Layers,
} from 'lucide-react';

const SAMPLE_REVIEWS = [
  {
    label: 'Genuine Sample',
    badge: 'Genuine',
    badgeVariant: 'success',
    text: 'The product quality is good. Delivery arrived in two days and packaging was intact.',
    rating: 4,
    product: 'UltraClean Robot Vacuum X9',
    reviewer: 'Marcus Vance',
  },
  {
    label: 'Suspicious Sample',
    badge: 'Suspicious',
    badgeVariant: 'danger',
    text: 'BEST PRODUCT EVER!! BUY NOW!! AMAZING AMAZING AMAZING!! MUST BUY TODAY!!',
    rating: 5,
    product: 'AeroSound Pro Wireless Headphones',
    reviewer: 'PromoBot_99',
  },
  {
    label: 'Neutral Sample',
    badge: 'Neutral',
    badgeVariant: 'secondary',
    text: 'The product works as expected. Nothing special. Decent build quality for the price.',
    rating: 3,
    product: 'VoltPulse Fast Wireless Charger Pad',
    reviewer: 'Alex Turner',
  },
];

export function ReviewAnalyzer() {
  const [text, setText] = useState(SAMPLE_REVIEWS[1].text);
  const [rating, setRating] = useState(SAMPLE_REVIEWS[1].rating);
  const [product, setProduct] = useState(SAMPLE_REVIEWS[1].product);
  const [reviewer, setReviewer] = useState(SAMPLE_REVIEWS[1].reviewer);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(() =>
    analyzeReviewContent({
      text: SAMPLE_REVIEWS[1].text,
      rating: SAMPLE_REVIEWS[1].rating,
      product: SAMPLE_REVIEWS[1].product,
      reviewer: SAMPLE_REVIEWS[1].reviewer,
    })
  );

  const { showToast } = useToast();

  const handlePopulateSample = (sample) => {
    setText(sample.text);
    setRating(sample.rating);
    setProduct(sample.product);
    setReviewer(sample.reviewer);
    showToast(`Loaded "${sample.label}" preset into analyzer`, 'info', 2000);
  };

  const handleRunAnalysis = () => {
    if (!text.trim()) {
      showToast('Please enter review content to analyze.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    // Smooth 400ms simulated AI inference transition
    setTimeout(() => {
      const result = analyzeReviewContent({
        text,
        rating,
        product,
        reviewer,
      });
      setAnalysisResult(result);
      setIsAnalyzing(false);
      showToast('AI analysis completed successfully.', 'success');
    }, 450);
  };

  const handleClear = () => {
    setText('');
    setProduct('');
    setReviewer('');
    setRating(5);
    setAnalysisResult(null);
    showToast('Analyzer reset to blank state.', 'info', 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="AI Review Analyzer"
        subtitle="Analyze review content and identify suspicious patterns, bot markers, and emotional dissonance in seconds."
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 text-[#8B5CF6] border border-violet-200">
            <Sparkles className="w-3.5 h-3.5" />
            Neural Heuristic Engine
          </span>
        }
      />

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Review Input Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-brand-dark">Review Input</span>
                <span className="text-xs text-brand-muted">• Single Entry Evaluation</span>
              </div>
              <span className="text-xs text-brand-muted">
                {text.length} characters
              </span>
            </div>

            {/* Quick Sample Presets */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                Try Example Samples
              </label>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_REVIEWS.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    onClick={() => handlePopulateSample(sample)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-[#635BFF] border border-brand-border hover:border-indigo-200 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-brand-muted group-hover:text-[#635BFF]" />
                    <span>{sample.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-brand-dark mb-1.5">
                Review Text <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste a customer review to evaluate its authenticity..."
                className="w-full p-3.5 text-sm bg-white border border-brand-border rounded-xl text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all resize-none font-sans"
              />
              <p className="text-[11px] text-brand-muted mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                Hint: Paste raw customer text including punctuations to evaluate syntactical features.
              </p>
            </div>

            {/* Rating Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 pt-3 border-t border-brand-border">
              <div>
                <label className="block text-xs font-medium text-brand-dark mb-1.5">
                  Assigned Rating
                </label>
                <div className="flex items-center gap-2">
                  <RatingStars
                    rating={rating}
                    size="md"
                    interactive
                    onChange={setRating}
                  />
                  <span className="text-xs font-semibold text-brand-dark">
                    {rating}.0
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-dark mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Wireless Headphones"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-dark mb-1">
                  Reviewer Handle
                </label>
                <input
                  type="text"
                  value={reviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  placeholder="e.g. Alex T. (optional)"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-brand-border rounded-lg text-brand-dark focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-border">
              <Button
                variant="ghost"
                size="sm"
                icon={RotateCcw}
                onClick={handleClear}
              >
                Clear
              </Button>

              <Button
                variant="ai"
                size="md"
                icon={Sparkles}
                loading={isAnalyzing}
                onClick={handleRunAnalysis}
              >
                Analyze Review
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Analysis Results Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {analysisResult ? (
            <Card className="p-6 border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                  <h3 className="text-sm font-semibold text-brand-dark">
                    Authenticity Diagnosis
                  </h3>
                </div>
                <span className="text-[11px] text-brand-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Just now
                </span>
              </div>

              {/* Verdict Banner */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 mb-5 ${
                  analysisResult.verdict === 'Genuine Review'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : analysisResult.verdict === 'Suspicious Review'
                    ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {analysisResult.verdict === 'Genuine Review' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  ) : analysisResult.verdict === 'Suspicious Review' ? (
                    <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                  ) : (
                    <HelpCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold opacity-75">
                      Verdict
                    </span>
                    <h4 className="text-base font-bold leading-tight">
                      {analysisResult.verdict}
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75 block">
                    Confidence
                  </span>
                  <span className="text-sm font-bold">
                    {analysisResult.confidence}%
                  </span>
                </div>
              </div>

              {/* Circular Gauge & Core Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-4 bg-slate-50/70 rounded-xl border border-brand-border mb-5">
                <RiskScoreGauge
                  score={analysisResult.fakeProbability}
                  size={120}
                  label="Fake Probability"
                />

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                      Risk Level
                    </span>
                    <div className="mt-0.5">
                      <RiskBadge level={analysisResult.riskLevel} />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                      Detected Sentiment
                    </span>
                    <div className="mt-0.5">
                      <SentimentBadge sentiment={analysisResult.sentiment} />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-brand-muted block">
                      Syntactic Metrics
                    </span>
                    <p className="text-[11px] text-brand-dark mt-0.5 font-medium">
                      {analysisResult.metrics?.wordCount} words • {analysisResult.metrics?.capsRatio}% caps
                    </p>
                  </div>
                </div>
              </div>

              {/* Granular Detection Signals */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Detection Reasons & Signals
                  </span>
                  <span className="text-[11px] text-brand-muted">
                    {analysisResult.detectionReasons?.length || 0} signals identified
                  </span>
                </div>
                <DetectionReasonList reasons={analysisResult.detectionReasons} />
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-brand-border">
                <Sparkles className="w-6 h-6 text-slate-400" />
              </div>
              <h4 className="text-sm font-semibold text-brand-dark">Awaiting Input</h4>
              <p className="text-xs text-brand-muted max-w-xs mt-1">
                Enter review text on the left or select a sample preset to run the AI analysis engine.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
export default ReviewAnalyzer;


import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { RiskBadge } from '../../components/reviews/RiskBadge';
import { SentimentBadge } from '../../components/reviews/SentimentBadge';
import { RiskScoreGauge } from '../../components/reviews/RiskScoreGauge';
import { DetectionReasonList } from '../../components/reviews/DetectionReasonList';
import { VerdictBanner } from '../../components/analyzer/VerdictBanner';
import { ReviewInputForm } from '../../components/analyzer/ReviewInputForm';
import { analyzeReviewContent } from '../../utils/reviewAnalysis';
import { useToast } from '../../hooks/useToast';
import { Sparkles, Clock } from 'lucide-react';

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
        {/* Left Column: Reusable Review Input Form (7 Cols) */}
        <div className="lg:col-span-7">
          <ReviewInputForm
            text={text}
            setText={setText}
            rating={rating}
            setRating={setRating}
            product={product}
            setProduct={setProduct}
            reviewer={reviewer}
            setReviewer={setReviewer}
            onRunAnalysis={handleRunAnalysis}
            onClear={handleClear}
            isAnalyzing={isAnalyzing}
            samples={SAMPLE_REVIEWS}
            onSelectSample={handlePopulateSample}
          />
        </div>

        {/* Right Column: Analysis Results Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {analysisResult ? (
            <Card className="p-4 sm:p-6 border-slate-200">
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

              {/* Reusable Verdict Banner */}
              <VerdictBanner
                verdict={analysisResult.verdict}
                confidence={analysisResult.confidence}
                className="mb-5"
              />

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

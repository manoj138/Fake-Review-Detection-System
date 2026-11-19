import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { RatingStars } from '../reviews/RatingStars';
import { SamplePresetPicker } from './SamplePresetPicker';
import { Sparkles, RotateCcw, Info } from 'lucide-react';

export function ReviewInputForm({
  text = '',
  setText,
  rating = 5,
  setRating,
  product = '',
  setProduct,
  reviewer = '',
  setReviewer,
  onRunAnalysis,
  onClear,
  isAnalyzing = false,
  samples = [],
  onSelectSample,
  className = '',
}) {
  return (
    <Card className={`p-4 sm:p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-brand-dark">Review Input</span>
          <span className="text-xs text-brand-muted">• Single Entry Evaluation</span>
        </div>
        <span className="text-xs text-brand-muted font-mono">
          {text.length} characters
        </span>
      </div>

      {/* Preset Samples Selector */}
      {samples.length > 0 && (
        <div className="mb-4">
          <SamplePresetPicker
            samples={samples}
            onSelectSample={onSelectSample}
          />
        </div>
      )}

      {/* Review Textarea */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-brand-dark mb-1.5">
          Review Text <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText && setText(e.target.value)}
          placeholder="Paste a customer review to evaluate its authenticity..."
          className="w-full p-3.5 text-sm bg-white border border-brand-border rounded-xl text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all resize-none font-sans"
        />
        <p className="text-[11px] text-brand-muted mt-1.5 flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>Hint: Paste raw customer text including punctuations to evaluate syntactical features.</span>
        </p>
      </div>

      {/* Assigned Rating & Metadata Inputs */}
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
            onChange={(e) => setProduct && setProduct(e.target.value)}
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
            onChange={(e) => setReviewer && setReviewer(e.target.value)}
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
          onClick={onClear}
        >
          Clear
        </Button>

        <Button
          variant="ai"
          size="md"
          icon={Sparkles}
          loading={isAnalyzing}
          onClick={onRunAnalysis}
        >
          Analyze Review
        </Button>
      </div>
    </Card>
  );
}

export default ReviewInputForm;


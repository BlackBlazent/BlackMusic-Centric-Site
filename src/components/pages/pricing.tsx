import React from 'react';

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  actionText: string;
  highlighted?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  period,
  features,
  actionText,
  highlighted = false,
}) => {
  return (
    <div className={`pricing-plan ${highlighted ? 'highlighted' : ''}`}>
      <div className="pricing-plan-header">
        <h3 className="pricing-plan-title">{title}</h3>
        <div className="pricing-plan-price">
          <span className="price">{price}</span>
          <span className="period">{period}</span>
        </div>
      </div>
      <div className="pricing-plan-features">
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="pricing-plan-action">
        <button className={`action-button ${highlighted ? 'highlighted' : ''}`}>
          {actionText}
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const plans = [
    {
      title: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Basic music player',
        'Ad-supported streaming',
        'Limited skips (6 per hour)',
        'Standard audio quality',
        'Mobile app access'
      ],
      actionText: 'Download',
      highlighted: false
    },
    {
      title: 'Basic',
      price: '$4.99',
      period: '/month',
      features: [
        'Ad-free listening',
        'Unlimited skips',
        'Offline playback for 1 device',
        'Higher audio quality',
        'Create up to 5 playlists'
      ],
      actionText: 'Get Started',
      highlighted: false
    },
    {
      title: 'Advanced',
      price: '$9.99',
      period: '/month',
      features: [
        'Everything in Basic',
        'Offline playback for 3 devices',
        'HD audio quality', 
        'Lyrics display feature',
        'Unlimited playlists',
        'Music discovery tools'
      ],
      actionText: 'Get Started',
      highlighted: true
    },
    {
      title: 'Pro',
      price: '$14.99',
      period: '/month',
      features: [
        'Everything in Advanced',
        'Studio-quality audio',
        'Offline playback for 5 devices',
        'Exclusive content access',
        'Early access to new features',
        'Family sharing (up to 6 accounts)'
      ],
      actionText: 'Get Started',
      highlighted: false
    }
  ];

  return (
    <div className="pricing-container">
      <div className="pricing-wrapper">
        <h1 className="pricing-title">Choose Your Plan</h1>
        <p className="pricing-subtitle">Select the perfect plan for your music streaming needs</p>
        
        <div className="pricing-plans">
          {plans.map((plan, index) => (
            <PricingPlan 
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              actionText={plan.actionText}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
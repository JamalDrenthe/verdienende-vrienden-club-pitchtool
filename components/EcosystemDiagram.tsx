import React from 'react';
import { EcosystemNode } from '../types';

interface EcosystemDiagramProps {
  nodes: EcosystemNode[];
  selectedNodeId: string;
  onNodeSelect: (id: string) => void;
}

export const EcosystemDiagram: React.FC<EcosystemDiagramProps> = ({ nodes, selectedNodeId, onNodeSelect }) => {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] bg-[#0F1623] rounded-3xl border border-white/5 overflow-hidden shadow-2xl group">
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F1623_80%)] pointer-events-none"></div>

      {/* Styles for flow animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flow-animation {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        .flow-arrow {
          animation: flow-animation 1.5s linear infinite;
        }
      `}} />

      {/* Connection Layer (SVG) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="3.5" refY="2" orient="auto" markerUnits="strokeWidth">
             <path d="M0,0 L4,2 L0,4" fill="#22d3ee" />
          </marker>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. VVC (Top 50,15) -> InvestBotiq (Center 50,40) */}
        <path 
          d="M 50 23 L 50 33" 
          stroke="url(#flowGradient)" 
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow"
        />

        {/* 2. InvestBotiq (Center 50,40) -> Spontiva (Right 85,60) */}
        <path 
          d="M 56 40 Q 85 40 85 53" 
          stroke="url(#flowGradient)" 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow"
          style={{ animationDelay: '0.5s' }}
        />

        {/* 3. Spontiva (Right 85,60) -> Djobba (Bottom 50,85) */}
        <path 
          d="M 85 67 Q 85 85 57 85" 
          stroke="url(#flowGradient)" 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow"
          style={{ animationDelay: '1s' }}
        />

        {/* 4. InvestBotiq (Center 50,40) -> ASH (Left 15,60) */}
        <path 
          d="M 44 40 Q 15 40 15 53" 
          stroke="url(#flowGradient)" 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow"
          style={{ animationDelay: '0.5s' }}
        />

      </svg>

      {/* Nodes Layer */}
      {nodes.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const Icon = node.icon;
        
        return (
          <div
            key={node.id}
            onClick={() => onNodeSelect(node.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-300`}
            style={{ 
              top: node.position.top, 
              left: node.position.left 
            }}
          >
            <div className="relative group/node">
                {/* Outer Glow Ring */}
                {isSelected && (
                    <div className={`absolute -inset-6 rounded-full bg-${node.color}/20 blur-xl animate-pulse`}></div>
                )}

                {/* Connection Orbits (Decorative) */}
                <div className={`absolute -inset-2 rounded-full border border-${node.color}/20 scale-110 opacity-0 group-hover/node:opacity-100 transition-opacity`}></div>

                {/* Main Circle */}
                <div className={`
                relative flex flex-col items-center justify-center
                w-20 h-20 md:w-28 md:h-28 rounded-full
                backdrop-blur-xl border-2 transition-all duration-300
                ${isSelected 
                    ? `border-${node.color} bg-[#0F1623] shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-110 z-20` 
                    : 'border-white/10 bg-[#0F1623]/80 hover:border-white/30 hover:bg-[#1E293B] hover:scale-105'
                }
                `}>
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-2 transition-colors duration-300 ${isSelected ? `text-${node.color}` : 'text-slate-400'}`} />
                  
                  <div className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center leading-tight max-w-[80%] ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                      {node.title}
                  </div>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
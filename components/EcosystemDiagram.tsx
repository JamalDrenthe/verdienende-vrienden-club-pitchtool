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
      <div className="absolute inset-0 opacity-20 eco-tech-mesh"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F1623_80%)] pointer-events-none"></div>

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

        {/* 1. VVC (Top 50,18) -> InvestBotiq (Center 50,42) */}
        <path 
          d="M 50 26 L 50 34" 
          stroke="url(#flowGradient)" 
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow"
        />

        {/* 2. InvestBotiq (Center 50,42) -> Spontiva (Right 82,65) */}
        <path 
          d="M 57 44 Q 82 44 82 57" 
          stroke="url(#flowGradient)" 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow flow-delay-1"
        />

        {/* 3. Spontiva (Right 82,65) -> Djobba (Bottom 50,82) */}
        <path 
          d="M 82 73 Q 82 82 57 82" 
          stroke="url(#flowGradient)" 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow flow-delay-2"
        />

        {/* 4. InvestBotiq (Center 50,42) -> WoningVry (Left 18,65) */}
        <path 
          d="M 43 44 Q 18 44 18 57" 
          stroke="url(#flowGradient)" 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke"
          markerEnd="url(#arrowhead)" 
          fill="none"
          filter="url(#glow)"
          strokeDasharray="4 4"
          className="flow-arrow flow-delay-1"
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
                w-20 h-20 md:w-24 md:h-24 rounded-full
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
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Define types for blockchain data
interface AdditionalLabels {
  ofac: boolean;
  tornado: boolean;
  hacker: boolean;
  mixers: boolean;
  drainer: boolean;
  fbi_ic3: boolean;
}

interface BlockchainNode {
  id: string;
  label: string;
  type: "eoa" | "contract";
  risk_score: number;
  additional_labels: AdditionalLabels;
  // D3 simulation adds these properties
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
}

interface BlockchainLink {
  source: string | BlockchainNode;
  target: string | BlockchainNode;
  value: number;
}

interface BlockchainData {
  nodes: BlockchainNode[];
  links: BlockchainLink[];
}
interface BlockchainConnectionMapProps {
    data : BlockchainData
}

export default function BlockchainConnectionMap({data} : BlockchainConnectionMapProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<BlockchainNode | null>(null);


  function truncateAddress(address: string): string {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  }

  function getRiskColor(risk_score: number): string {
    if (risk_score >= 100) return "#ff3333"; // High risk - red
    if (risk_score >= 10) return "#ff9933"; // Medium risk - orange
    return "#33cc33"; // Low risk - green
  }

  function getNodeSize(node: BlockchainNode): number {
    const baseSize = 25;
    const riskFactor = Math.min(node.risk_score / 10 + 1, 10);

    // Contract types slightly larger than EOAs
    const typeFactor = node.type === "contract" ? 1.2 : 1;

    // Additional size for flagged accounts
    const flagFactor = Object.values(node.additional_labels).some((val) => val)
      ? 1.3
      : 1;

    return baseSize * riskFactor * typeFactor * flagFactor;
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 500;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add gradient defs for link styling
    const defs = svg.append("defs");

    // Gradient for high risk links
    const highRiskGradient = defs
      .append("linearGradient")
      .attr("id", "highRiskGradient")
      .attr("gradientUnits", "userSpaceOnUse");

    highRiskGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ff9933");

    highRiskGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff3333");

    // Create a container group for zoom functionality
    const g = svg.append("g");

    // Add zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initial zoom - center and scale everything for better visibility
    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8)
    );

    // Force simulation node type for D3
    type SimulationNode = d3.SimulationNodeDatum & BlockchainNode;

    const simulation = d3
      .forceSimulation<SimulationNode>()
      .nodes(data.nodes as SimulationNode[])
      .force(
        "link",
        d3
          .forceLink<SimulationNode, d3.SimulationLinkDatum<SimulationNode>>(
            data.links as d3.SimulationLinkDatum<SimulationNode>[]
          )
          .id((d) => d.id)
          .distance((d) => {
            // Safely access source and target
            const sourceId =
              typeof d.source === "object" ? d.source.id : d.source;
            const targetId =
              typeof d.target === "object" ? d.target.id : d.target;

            // Shorter distance for higher risk connections
            const sourceNode = data.nodes.find((n) => n.id === sourceId);
            const targetNode = data.nodes.find((n) => n.id === targetId);

            const sourceRisk = sourceNode?.risk_score || 0;
            const targetRisk = targetNode?.risk_score || 0;
            const riskFactor = Math.max(sourceRisk, targetRisk) / 20;
            return 120 / (riskFactor + 1);
          })
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(0, 0))
      .force(
        "collision",
        d3.forceCollide().radius((d) => getNodeSize(d as BlockchainNode) + 15)
      )
      .force("x", d3.forceX().strength(0.07))
      .force("y", d3.forceY().strength(0.07));

    // Create arrowhead marker
    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    // Helper function to safely get source/target nodes
    const getNodeById = (
      id: string | SimulationNode
    ): SimulationNode | undefined => {
      if (typeof id === "object") return id;
      return data.nodes.find((n) => n.id === id) as SimulationNode | undefined;
    };

    // Create curved links with arrows
    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("path")
      .data(data.links)
      .join("path")
      .attr("stroke", (d) => {
        const sourceNode = getNodeById(d.source);
        const targetNode = getNodeById(d.target);

        if (!sourceNode || !targetNode) return "#999";

        const maxRisk = Math.max(sourceNode.risk_score, targetNode.risk_score);
        if (maxRisk >= 100) return "url(#highRiskGradient)";
        if (maxRisk >= 10) return "#ff9933";
        return "#999";
      })
      .attr("stroke-opacity", 0.8)
      .attr("stroke-width", (d) => Math.sqrt(d.value) * 3)
      .attr("fill", "none")
      .attr("marker-end", "url(#arrowhead)");
    const nodeGroup = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data<SimulationNode>(data.nodes as SimulationNode[])
      .join("g");

    nodeGroup.call(
      d3
        .drag<SVGGElement, SimulationNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any
    );

    nodeGroup
      .filter((d) => d.risk_score >= 10)
      .append("circle")
      .attr("r", (d) => getNodeSize(d) + 5)
      .attr("fill", (d) => {
        if (d.risk_score >= 100) return "rgba(255, 51, 51, 0.3)";
        return "rgba(255, 153, 51, 0.3)";
      });

    nodeGroup
      .append("circle")
      .attr("r", (d) => getNodeSize(d))
      .attr("fill", (d) => getRiskColor(d.risk_score))
      .attr("stroke", (d) => {
        if (Object.values(d.additional_labels).some((val) => val)) {
          return "#000";
        }
        return "#fff";
      })
      .attr("stroke-width", (d) => {
        return Object.values(d.additional_labels).some((val) => val) ? 2 : 1;
      })
      .on("click", (event: MouseEvent, d: SimulationNode) => {
        setSelectedNode(d);
        event.stopPropagation();
      });

    nodeGroup
      .filter((d) => d.type === "contract")
      .append("circle")
      .attr("r", (d) => getNodeSize(d) * 0.6)
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,2");

    nodeGroup
      .append("text")
      .attr("dy", (d) => -getNodeSize(d) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .attr("paint-order", "stroke")
      .text((d) => (d.label === d.id ? truncateAddress(d.id) : d.label));

    nodeGroup
      .append("text")
      .attr("dy", (d) => -getNodeSize(d) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", (d) => {
        if (d.risk_score >= 100) return "#ff3333";
        if (d.risk_score >= 10) return "#ff9933";
        return "#333";
      })
      .text((d) => (d.label === d.id ? truncateAddress(d.id) : d.label));

    nodeGroup
      .append("text")
      .attr("dy", (d) => -getNodeSize(d) + 12)
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("fill", "#fff")
      .text((d) => d.type.toUpperCase());

    // Add interaction to clear selected node when clicking on empty space
    svg.on("click", () => {
      setSelectedNode(null);
    });

    function linkArc(d: d3.SimulationLinkDatum<SimulationNode>): string {
      const source = d.source as SimulationNode;
      const target = d.target as SimulationNode;

      if (!source.x || !source.y || !target.x || !target.y) return "";

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;
      return `M${source.x},${source.y}A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
    }

    simulation.on("tick", () => {
      link.attr("d", linkArc);
      nodeGroup.attr("transform", (d) => {
        return `translate(${d.x ?? 0},${d.y ?? 0})`;
      });
    });

    function dragstarted(
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ): void {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ): void {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ): void {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const mainNode = data.nodes.find(
      (n) => n.id === "0x8589427373D6D84E98730D7795D8f6f8731FDA16"
    ) as SimulationNode;
    if (mainNode) {
      mainNode.fx = 0;
      mainNode.fy = 0;
      for (let i = 0; i < 50; ++i) simulation.tick();

      setTimeout(() => {
        if (mainNode) {
          mainNode.fx = null;
          mainNode.fy = null;
        }
      }, 3000);
    }

    simulation.alpha(1).restart();

    return () => {
      simulation.stop();
    };
  }, []);

  // Address detail panel
  const renderDetailPanel = () => {
    if (!selectedNode) return null;

    return (
      <div className="absolute right-4 top-4 bg-white p-4 rounded shadow-lg max-w-xs border border-gray-200">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          {selectedNode.label !== selectedNode.id
            ? selectedNode.label
            : truncateAddress(selectedNode.id)}
        </h3>
        <p className="text-xs mb-2 font-mono break-all bg-gray-50 text-muted-foreground p-2 rounded">
          {selectedNode.id}
        </p>
        <div className="flex gap-4 mb-2">
          <div className="text-sm">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium ml-1 text-black">
              {selectedNode.type.toUpperCase()}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Risk:</span>
            <span
              className="ml-1 font-semibold"
              style={{ color: getRiskColor(selectedNode.risk_score) }}
            >
              {selectedNode.risk_score}
            </span>
          </div>
        </div>

        {Object.values(selectedNode.additional_labels).some((val) => val) && (
          <div className="mt-3 border-t border-gray-200 pt-2">
            <p className="text-sm font-medium text-gray-700">Flags:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {Object.entries(selectedNode.additional_labels).map(
                ([key, value]) =>
                  value ? (
                    <span
                      key={key}
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                    >
                      {key}
                    </span>
                  ) : null
              )}
            </div>
          </div>
        )}

        <button
          className="mt-4 text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-gray-800"
          onClick={(e) => {
            setSelectedNode(null);
            e.stopPropagation();
          }}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="bg-inherit shadow-lg p-6 mb-4 w-full">
        <h2 className="text-xl font-bold mb-4">
          Blockchain Address Connections
        </h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm">High Risk (100+)</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-orange-400 mr-2"></span>
            <span className="text-sm">Medium Risk (10-99)</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm">Low Risk (0-9)</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full border-2 border-black mr-2"></span>
            <span className="text-sm">Flagged Accounts</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full border border-white border-dashed bg-blue-500 mr-2"></span>
            <span className="text-sm">Contract</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mb-3">
          <p>
            Drag nodes to reposition • Click a node for details • Scroll to zoom
            • Drag background to pan
          </p>
        </div>
        <div className="border border-gray-200  bg-gray-50">
          <svg ref={svgRef} className="w-full min-h-96"></svg>
        </div>
      </div>
      {renderDetailPanel()}
    </div>
  );
}

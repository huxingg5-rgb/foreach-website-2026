import type { EngineeringArticleBlock } from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import type { PipettingBasicsWorkflow } from "@/data/resources/technical-articles/what-is-pipetting.article";
import styles from "./PipettingBasicsLead.module.css";

/** Keep the cover for article cards, and render its overview as readable, responsive text. */
export default function PipettingBasicsLead({ blocks, workflows }: {
  blocks: readonly EngineeringArticleBlock[];
  workflows: readonly PipettingBasicsWorkflow[];
}) {
  return <>
    {blocks.map((block, index) => {
      if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
      if (block.type !== "figure") return null;
      return (
        <figure className={styles.overview} aria-label={block.alt} key={index}>
          {workflows.map(workflow => (
            <div className={styles.flowRow} key={workflow.label}>
              <div className={styles.flowLabel}>
                <strong>{workflow.label}</strong>
                <span>{workflow.description}</span>
              </div>
              <ol className={styles.flowSteps} aria-label={workflow.label}>
                {workflow.steps.map((step, stepIndex) => <li key={step}>
                  {stepIndex > 0 && <span className={styles.arrow} aria-hidden="true">→</span>}
                  <span>{step}</span>
                </li>)}
              </ol>
            </div>
          ))}
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    })}
  </>;
}

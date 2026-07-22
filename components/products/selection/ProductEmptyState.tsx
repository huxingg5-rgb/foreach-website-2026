type ProductEmptyStateProps = {
  title: string;
  description: string;
};

export default function ProductEmptyState({
  title,
  description,
}: ProductEmptyStateProps) {
  return (
    <div className="empty-state active">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

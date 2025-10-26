from Bio import SeqIO
import pandas as pd

sequences = []

for record in SeqIO.parse("C:/Users/muska/Downloads/gencode.v49.pc_transcripts.fa.gz", "fasta"):
    sequences.append({
        "transcript_id": record.id,
        "sequence": str(record.seq)
    })

df = pd.DataFrame(sequences)
df.to_csv("gencode_v49_sequences.csv", index=False)
print("CSV created with", len(df), "rows")

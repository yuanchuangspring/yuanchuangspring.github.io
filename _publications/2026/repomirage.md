---
title:          "RepoMirage: Probing Repository Context Reasoning in Code Agents with Perturbations"
date:           2026-02-05 00:00:00 +0800
selected:       true
pub:            "ICLR Workshop AIWILD and Realiable Autonomy"
# pub_pre:        "Submitted to "
# pub_post:       'Accepted'
pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Accepted</span>'
pub_date:       "2026"
# semantic_scholar_id: 204e3073870fae3d05bcbc2f6a8e263d9b72e776  # use this to retrieve citation count
abstract: >-
  Code agents are currently having skillful performance on repository-level software engineering benchmarks, but it remains unclear whether success on end-to-end tasks such as issue resolution truly reflects repository context reasoning, the ability to identify the task-relevant information across multiple files and reason over the relations among them. To investigate this question, we introduce RepoMirage, a two-stage evaluation suite built on SWE-Bench Verified that adopts perturbation as a diagnostic tool to increase the demand for context reasoning by transforming how the repository is exposed. First, RepoMirage-Perturb applies three types of semantics-preserving repository-level perturbations, revealing a clear performance drop when correct solving requires broader context access. RepoMirage-Extend further turns perturbation-targeted structural bottlenecks into explicit tasks beyond issue resolution, where the average performance declines from 66.8% in the original setting to 25.3%, indicating a significant deficiency in repository context reasoning. Further trajectory analysis reveals an exploration drift, where agents access broader repository context but fail to turn it into effective structure information. Motivated by this observation, we propose RepoAnchor, a structure-first prototype workflow that separates repository exploration from downstream problem solving, and show that explicit structural scaffolding yields notable gains. These results uncover an previously overlooked gap in repository context reasoning for code agents and suggest that stronger structure-aware methods are potential to improve them.
cover:          /assets/images/covers/cover_repomirage.png
authors:
  - Hanyu Li *
  - Yichi Zhang *
  - Speed Zhu
  - Hang Su
  - Jun Zhu
  - Yinpeng Dong
links:
  arxiv: https://arxiv.org/abs/2605.26177
#   Unsplash: https://unsplash.com/photos/sliced-in-half-pineapple--_PLJZmHZzk
---

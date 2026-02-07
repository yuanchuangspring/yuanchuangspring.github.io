---
title:          "SaFeR-Steer: Evolving Multi-Turn MLLMs via Synthetic Bootstrapping and Feedback Dynamics"
date:           2026-01-28 00:00:00 +0800
selected:       true
pub:            "ICML 2026  "
# pub_pre:        "Submitted to "
pub_post:       'Under review.'
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2026"
# semantic_scholar_id: 204e3073870fae3d05bcbc2f6a8e263d9b72e776  # use this to retrieve citation count
abstract: >-
  MLLMs are increasingly deployed in multi-turn settings, where attackers can escalate unsafe intent through the evolving visual-text history and exploit long-context safety decay. Yet safety alignment is still dominated by single-turn data and fixed-template dialogues, leaving a mismatch between training and deployment. To bridge this gap, we propose SaFeR-Steer, a progressive multi-turn alignment framework that combines staged synthetic bootstrapping with tutor-in-the-loop GRPO to train a single student under adaptive, on-policy attacks. We also introduce TCSR, which uses trajectory-level minimum/average safety to propagate late-turn failures to earlier turns. I. Dataset. We release STEER, a multi-turn multimodal safety dataset with STEER-SFT (12,934), STEER-RL (2,000), and STEER-Bench (3,227) dialogues spanning 2~10 turns. II. Experiment. Starting from Qwen2.5-VL-3B/7B, SaFeR-Steer improves Safety/Helpfulness on both single-turn (48.30/45.86 → 81.84/70.77 for 3B; 56.21/60.32 → 87.89/77.40 for 7B) and multi-turn benchmarks (12.55/27.13 for 3B → 55.58/70.27; 24.66/46.48 → 64.89/72.35 for 7B), shifting failures to later turns and yielding robustness beyond scaling alone.
cover:          /assets/images/covers/cover_safer.png
authors:
  - Haolong Hu *
  - Hanyu Li *
  - Tiancheng He
  - Huahui Yi
  - An Zhang
  - Qiankun Li
  - Kun Wang
  - Yang Liu
  - Zhigang Zeng
# links:
#   Code: https://github.com/luost26/academic-homepage
#   Unsplash: https://unsplash.com/photos/sliced-in-half-pineapple--_PLJZmHZzk
---
